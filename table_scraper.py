import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://example.com/page-with-tables"
headers = {"User-Agent": "Mozilla/5.0"}
html = requests.get(url, headers=headers, timeout=30).text

soup = BeautifulSoup(html, "html.parser")

# Example: select table by id or class
table = soup.select_one("table#prices")  # or ".data-table", "table[summary='Rates']"
rows = []
for tr in table.select("tr"):
    cells = [c.get_text(strip=True) for c in tr.find_all(["th", "td"])]
    if cells: rows.append(cells)

# Convert to DataFrame and fix header
df = pd.DataFrame(rows)
df.columns = df.iloc[0]      # first row as header if appropriate
df = df[1:].reset_index(drop=True)

print(df.head())