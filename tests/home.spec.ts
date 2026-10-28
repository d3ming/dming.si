import { expect, test } from "@playwright/test";

// stated-rule: Dong asked for a concise homepage linking these five destinations.
test("creator homepage exposes the requested destinations without JavaScript", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "@dming" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("heading", { level: 1 })
      .getByRole("link", { name: "@dming", exact: true }),
  ).toHaveAttribute("href", "https://x.com/dming");
  await expect(page).toHaveTitle("Dong Ming (@dming) · Projects and writing");
  await expect(page.getByText("Dong Ming", { exact: true })).toHaveCount(0);
  const projects = page.getByRole("navigation", {
    name: "Projects",
    exact: true,
  });
  await expect(projects.getByRole("link")).toHaveCount(2);
  await expect(projects.getByRole("link", { name: /alpha/ })).toHaveAttribute(
    "href",
    "https://alpha.dming.si",
  );
  await expect(projects.getByRole("link", { name: /wire/ })).toHaveAttribute(
    "href",
    "https://wire.dming.si",
  );
  const socials = page.getByRole("navigation", { name: "Find me online" });
  for (const [name, url] of [
    ["X", "https://x.com/dming"],
    ["LinkedIn", "https://www.linkedin.com/in/dongming/"],
    ["Substack", "https://mingdom.substack.com"],
  ]) {
    await expect(
      socials.getByRole("link", { name: new RegExp(`^${name}`) }),
    ).toHaveAttribute("href", url!);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(
    await page.evaluate(() => {
      const links = [...document.querySelectorAll(".project, .socials a")];
      return links.every((link) => {
        const box = link.getBoundingClientRect();
        return (
          box.width >= 44 &&
          box.height >= 44 &&
          box.bottom <= window.innerHeight
        );
      });
    }),
  ).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("home.png") });
  await page.getByRole("link", { name: /alpha/ }).focus();
  await expect(page.getByRole("link", { name: /alpha/ })).toBeFocused();
});

// command-output: the generated 404 must give a visitor a usable route home.
test("unknown pages lead back home", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: /Back to @dming/ }).click();
  await expect(
    page.getByRole("heading", { name: "@dming", exact: true }),
  ).toBeVisible();
});
