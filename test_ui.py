from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Take screenshot of homepage
        page.goto("http://localhost:4321/")
        page.screenshot(path="homepage_screenshot.png", full_page=True)

        # Take screenshot of blog post page
        page.goto("http://localhost:4321/blog/")
        page.screenshot(path="blog_screenshot.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify()
