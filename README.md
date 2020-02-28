<h1 align="center">
  Twending
</h1>

<p align="center">
  <a href="https://codechecks.io">
    <img
      alt="Code Checks"
      src="https://raw.githubusercontent.com/codechecks/docs/master/images/badges/badge-default.svg?sanitize=true"
    />
  </a>
  <a href="https://github.com/Brettm12345/twending/actions?query=workflow%3ACI">
    <img
      style="margin: 0px 2px;"
      alt="CI Workflow Status"
      src="https://github.com/Brettm12345/twending/workflows/CI/badge.svg"
    />
  </a>
  <a href="https://codeclimate.com/github/Brettm12345/twending/maintainability">
    <img
      alt="Maintainability"
      src="https://api.codeclimate.com/v1/badges/072e2e327dabeef158a6/maintainability"
    />
  </a>
</p>

<p align="center">
  Yet another github trending web application.
</p>

<a href="https://twending.now.sh">
  <img
    align="center"
    alt="Screenshot"
    src="https://raw.githubusercontent.com/Brettm12345/twending/master/public/screenshot.png"
  />
</a>

## Twending is

- _instant_ by automatically fetches the next page while you're reading the current one
- _lightweight_ the total build build under 100kB

## Development

To get started with development use these commands

```zsh
git clone https://github.com/brettm12345/twending
yarn install
yarn dev
```

Then rename [`.env.sample`](./.env.sample) to `.env.build` and
[create a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
