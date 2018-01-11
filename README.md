# The Baking Supply Co. Theme

## Getting Started

### 1. Installation

##### Clone Repository

    git clone https://github.com/sanctuarycomputer/bsco-shopify.git

##### Install Packages

    yarn

Make sure that Webpack, PostCSS CLI, Node-SASS, and CleanCSS CLI are properly installed for CLI usage by `package.json`'s scripts.

##### ThemeKit Setup

First install the latest version of ThemeKit:

    brew tap shopify/shopify
    brew install themekit

Duplicate the `config_example.yml`:

    cp config_example.yml config.yml

Create a new API identity on [Shopify Private App Manager](https://the-baking-supply-co.myshopify.com/admin/apps/private/new). Make sure to authorize read and write access for theme templates and assets. Copy the "password" after the key has been generated and paste it into the password field in each environment in your `config.yml`.

### 2. Up and Running

You now have everything you need to make changes to the live theme. Simply running `yarn start` will compile all SCSS and JS source files along with uploading all asset and template file changes to Shopify.
