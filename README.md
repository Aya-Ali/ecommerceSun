# FreshCart

FreshCart is scaffolded with Next.js App Router and TypeScript. The route groups below mirror the screens found in the linked Figma file. Screen UI and production data behavior remain to be implemented from the Figma designs.

## Structure

```text
src/
  app/
    (store)/                Storefront layout and shopping routes
    (account)/              Account, profile, orders, and wishlist
    (auth)/                 Login, signup, and password recovery
  components/
    home/                   Homepage carousel and sections
    layout/                 Shared navbar and storefront shell
    shared/                 Reusable cross-feature pieces
    ui/                     UI primitives
  features/
    account/ auth/ cart/ catalog/ checkout/ home/
  hooks/                    Shared React hooks
  lib/                      Shared utilities and service clients
  types/                    Shared TypeScript types
  constants/                Shared constants
public/
  icons/                    Local icon assets
  images/                   Local product and marketing images
```

## Figma screen mapping

The Figma file includes responsive Mobile, Tablet, and Desktop designs for the home, products, product details, categories, brands, search, cart, checkout, login, sign up, password recovery, addresses, profile settings, wishlist, and orders screens. Keep responsive variants in the same route and implement them with responsive layouts rather than separate URLs.

## Commands

- `npm run dev` — start the local development server
- `npm run build` — build the production app
- `npm run lint` — lint the project
