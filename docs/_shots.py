# -*- coding: utf-8 -*-
"""Скриншоты для README. Запуск: сначала сервер на 8787 (конфигурация
tavola-lite в launch.json), потом python docs/_shots.py

⚠️ --lang=en-US обязателен: Chromium рисует поля дат и чисел на языке
интерфейса, и в английском кадре вылезла бы русская дата.
"""
import os
from playwright.sync_api import sync_playwright

OUT = os.path.dirname(os.path.abspath(__file__))
BASE = 'http://localhost:8787/'

SHOTS = [
    ('home',      'index.html', 'light', 'en',   0, 1000),
    # 520 — чтобы в кадр попали и фильтры, и сами блюда: выше остаётся
    # воздух между счётчиком «12 з 12 страв» и первым разделом.
    ('menu-dark', 'menu.html',  'dark',  'uk', 520, 1000),
]

PREP = """() => {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
  const s = document.createElement('style');
  s.textContent = '*{transition:none!important;animation:none!important}';
  document.head.appendChild(s);
}"""

with sync_playwright() as p:
    browser = p.chromium.launch(args=['--lang=en-US'])
    ctx = browser.new_context(viewport={'width': 1600, 'height': 1000},
                              device_scale_factor=2, locale='en-US')
    page = ctx.new_page()
    for name, url, theme, lang, scroll, height in SHOTS:
        page.goto(BASE + url)
        page.evaluate("([t, l]) => { try { localStorage.setItem('tavola-theme', t);"
                      " localStorage.setItem('tavola-lang', l); } catch(e) {} }", [theme, lang])
        page.reload()
        page.wait_for_load_state('networkidle')
        page.evaluate(PREP)
        page.evaluate('y => scrollTo(0, y)', scroll)
        page.wait_for_timeout(450)
        page.set_viewport_size({'width': 1600, 'height': height})
        page.wait_for_timeout(250)
        dst = os.path.join(OUT, name + '.png')
        page.screenshot(path=dst)
        print('%-10s %6.0f KB' % (name, os.path.getsize(dst) / 1024))
    browser.close()
