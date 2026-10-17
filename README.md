# Lovelace for Zed

A dark theme for Zed, based on [Dan Sarich’s Lovelace theme for VS Code](https://github.com/Dsarich33/lovelace-theme), version 1.0.0.

The port keeps Lovelace’s blue-gray backgrounds, pastel syntax palette, italic comments, editor selections, and terminal colors. Its project panel uses bright file names and familiar Git status colors.

## Install locally

1. Clone or download this repository.
2. In Zed, open Extensions with `zed: extensions` in the command palette.
3. Choose **Install Dev Extension** and select the repository directory.
4. Run `theme selector: toggle` and select **Lovelace**.

You can also copy `themes/lovelace.json` into Zed’s local themes directory and restart Zed:

- macOS and Linux: `~/.config/zed/themes/`
- Windows: `%USERPROFILE%\AppData\Roaming\Zed\themes\`

If you already have a local theme named Lovelace, back it up and move it out of the themes directory before testing this extension. That avoids loading two themes with the same name.

## Colors

| Element                    | Color             |
| -------------------------- | ----------------- |
| Editor background          | `#1D1F28`         |
| Side panel background      | `#232530`         |
| Status bar and active line | `#252833`         |
| Main and muted UI text     | `#FDFDFD`         |
| Editor selection           | `#3F4457`         |
| Comments                   | `#5C6370`, italic |
| Keywords                   | `#C678DD`         |
| Functions                  | `#61AFEF`         |
| Strings                    | `#4DB1A3`         |
| Numbers and constants      | `#F0A276`         |
| Modified files             | `#E2C08D`         |
| Added and untracked files  | `#73C991`         |
| Deleted files              | `#C74E39`         |

## Scope and differences

This extension contains only a color theme. It does not change fonts, font sizes, keybindings, AI providers, or other personal settings. File icons are separate; Material Icon Theme can be installed independently.

The syntax colors are adapted to Zed’s highlighting categories. Some language-specific token assignments differ from VS Code.

Zed shares its main UI text color between agent replies and selected file names. This theme keeps that color bright so selecting a file does not dim its name. The `text.muted` color also applies to UI labels beyond the project panel.

## Development checks

Use Node.js 22 or newer and pnpm 12.11.2:

```sh
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` runs:

- Theme validation with Ajv against a local snapshot of Zed’s official theme schema v0.2.0.
- TOML validation with Taplo, including syntax and duplicate-key checks for `extension.toml`.
- Formatting checks with Prettier for JSON, JavaScript, Markdown, and YAML, and Taplo for TOML.

Run `pnpm format` to apply formatting. Individual checks are available as `pnpm validate:theme`, `pnpm validate:manifest`, and `pnpm format:check`.

GitHub Actions runs `pnpm check` on pushes and pull requests. The tooling dependencies are development-only; they are not part of the installed theme.

These checks do not replace Zed’s extension packaging checks or manual visual testing. Before a release, install the packaged extension in Zed without personal theme overrides and inspect syntax highlighting, selected file names, Git status colors, selections, the terminal, and the agent panel. Valid colors can still produce unintended visual results when Zed shares a theme token between components.

## Credits and license

- Original Lovelace theme and palette: **Dan Sarich**.
- Zed port and UI adaptations: **Tom**.

Distributed under the [MIT license](LICENSE), with the original copyright and permission notice preserved.

## Publishing

The extension ID is `lovelace-theme`, and its initial version is `0.1.0`. The source repository is [mrdarkside/lovelace-theme](https://github.com/mrdarkside/lovelace-theme).

Before submitting it to the Zed registry:

1. Push the commit you intend to submit to this repository.
2. Install and manually test this extension at the exact commit to be submitted, without personal theme overrides affecting the preview.
3. Add the repository as an HTTPS Git submodule at `extensions/lovelace-theme` in a fork of `zed-industries/extensions`.
4. Register version `0.1.0` in that repository’s `extensions.toml`, run `pnpm sort-extensions`, and open a pull request.

See Zed’s [publishing guide](https://zed.dev/docs/extensions/publishing/publishing-guide) and [publishing prerequisites](https://zed.dev/docs/extensions/publishing/prerequisites).
