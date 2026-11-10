import { expect, test } from "@playwright/test"

test.describe("Desktop nav hover intent", () => {
  test.beforeEach(async ({ page }) => {
    const viewport = page.viewportSize()
    test.skip(!viewport || viewport.width < 768, "Desktop navigation only")
    await page.goto("/")
  })

  test("a continuous sweep past the nav opens no menu", async ({ page }) => {
    const buildTrigger = page
      .getByRole("button", { name: "Build", exact: true })
      .first()

    await page.mouse.move(660, 10)
    await page.mouse.move(380, 430, { steps: 24 })

    await expect(buildTrigger).toHaveAttribute("data-state", "closed")
    await expect(page.locator('nav [data-state="open"]')).toHaveCount(0)
  })

  test("dwelling on a section still opens the menu", async ({ page }) => {
    await page
      .getByRole("button", { name: "Build", exact: true })
      .first()
      .hover()
    await page.waitForTimeout(350)
    await expect(page.getByText("Start building").first()).toBeVisible()
  })
})
