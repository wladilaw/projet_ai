import os
import time
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# --- Config ---
load_dotenv()
BOT_TOKEN       = os.getenv("BOT_TOKEN")
CHAT_ID         = os.getenv("CHAT_ID")
DROP_THRESHOLD  = 25.0      # % chute de cote
VOLUME_THRESHOLD = 1500.0   # € volume misé
SCAN_INTERVAL   = 300       # en secondes (5 min)

API_URL = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

seen = set()

def fetch_dropping_odds():
    url = "https://oddspedia.com/dropping-odds"
    headers = {"User-Agent": "Mozilla/5.0"}
    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.text, "html.parser")
    alerts = []
    rows = soup.select("table.dropping-odds-table tbody tr")
    for row in rows:
        try:
            pct = float(row.select_one(".drop-percent").text.strip().replace("%",""))
            if pct < DROP_THRESHOLD:
                continue

            vol = float(
                row.select_one(".volume-cell").text
                .replace("€","").replace(",","").strip()
            )
            if vol < VOLUME_THRESHOLD:
                continue

            match  = row.select_one(".match-name").text.strip()
            market = row.select_one(".market-name").text.strip()
            odds   = row.select_one(".odds-cell").text.strip()
            href   = row.select_one("a")["href"]
            link   = f"https://oddspedia.com{href}"

            alerts.append({
                "match": match,
                "market": market,
                "pct": pct,
                "vol": vol,
                "odds": odds,
                "link": link
            })
        except:
            continue
    return alerts

def send_telegram(text):
    payload = {
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "Markdown",
        "disable_web_page_preview": False
    }
    requests.post(API_URL, data=payload)

def main():
    print("🤖 Bot démarré…")
    while True:
        items = fetch_dropping_odds()
        for it in items:
            if it["link"] not in seen:
                seen.add(it["link"])
                msg = (
                    f"⚠️ *ALERTE FIXED MATCH POTENTIEL* ⚠️\n\n"
                    f"*Match :* {it['match']}\n"
                    f"*Marché :* {it['market']}\n"
                    f"*Chute :* -{it['pct']:.1f}%\n"
                    f"*Volume :* {it['vol']:.0f}€\n"
                    f"*Cote :* {it['odds']}\n"
                    f"[Voir détails]({it['link']})"
                )
                send_telegram(msg)
        time.sleep(SCAN_INTERVAL)

if __name__ == "__main__":
    main()
