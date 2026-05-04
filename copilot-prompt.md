# Task: Build a Product Upload Mobile App (React Native + Expo Router)

## Project Context

This is an existing Expo Router project (`flipapp/flip`) with the following structure:

- `app/` — screens (Expo Router file-based routing)
- `app/(tabs)/` — tab layout
- `app/_layout.tsx` — root layout (already has ThemeProvider, Stack, StatusBar, react-native-reanimated)
- `app/modal.tsx` — modal screen
- `components/` — shared UI components
- `constants/` — app constants
- `hooks/` — custom hooks
- `assets/` — images/fonts

Do NOT restructure the project. Work within the existing layout.

---

## Feature Requirements

### 1. Splash Screen

- Show a branded splash screen on app launch
- Display app name (e.g. "FlipApp" or "ProductVault") and a logo/icon
- Auto-navigate to Home after ~2 seconds
- Use `expo-splash-screen` or an animated screen component

---

### 2. Home Screen (`app/(tabs)/index.tsx`)

- Show a **large centered "+" add button** when no products exist
- When products exist, show them in a **table format** with columns:
  - `#` | `Photo` (thumbnail) | `Name` | `Price`
- Below the table, show the "+" button (disabled/hidden when limit reached)
- Show a **badge or counter** like "3/5 products added"

---

### 3. Form Screen (`app/add-product.tsx`)

- Accessible via pressing the "+" button on Home
- Form fields:
  - **Product Name** — TextInput
  - **Price** — TextInput (numeric keyboard)
  - **Photo** — Image picker using `expo-image-picker`
    - Show a preview of selected image
    - Allow picking from camera roll
- **Submit button** — "Add Product"
- On submit: validate all fields, then save product to state/context
- If product count is already 5 before navigating here, show limit modal immediately

---

### 4. Limit Modal (`app/modal.tsx` or inline Modal component)

- Use React Native's `<Modal>` component (or adapt existing `modal.tsx`)
- Trigger when:
  - User tries to add a 6th product
  - OR user opens the form when already at 5 products
- Modal content:
  - Icon (e.g. warning or info)
  - Title: "Product Limit Reached"
  - Message: "You can only upload up to 5 products."
  - "OK" button to dismiss

---

## State Management

Use **React Context + useReducer** for global product state.

Create `context/ProductContext.tsx`:

```ts
type Product = {
  id: string;
  name: string;
  price: string;
  photoUri: string;
};

type State = {
  products: Product[];
};

type Action =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'RESET' };
```

- Export `ProductProvider` to wrap the app in `_layout.tsx`
- Export `useProducts` hook for access in screens
- Max products constant: `MAX_PRODUCTS = 5`

---

## Navigation Flow

```
Splash Screen
    ↓ (auto after 2s)
Home Screen (tabs/index)
    ↓ (tap "+" button)
Add Product Screen (app/add-product)
    ↓ (on submit)
Home Screen (updated table)

[At any point if limit = 5] → Modal popup
```

Add `add-product` to the Stack in `_layout.tsx`:

```tsx
<Stack.Screen
  name="add-product"
  options={{ title: 'Add Product', presentation: 'card' }}
/>
```

---

## UI / UX Guidelines

- Use existing `ThemeProvider` with `DarkTheme` / `DefaultTheme` from `@react-navigation/native`
- Clean, minimal UI — white cards, subtle shadows, rounded corners
- Table rows should alternate background color for readability
- Thumbnail images in table: 40x40, `borderRadius: 6`
- "+" button: large circular FAB (Floating Action Button), accent color
- Show subtle animations using `react-native-reanimated` (already installed):
  - FAB scale on press
  - Table row fade-in when products are added
- Form inputs: clear labels, proper keyboard types, error states shown inline

---

## File Structure to Create/Modify

```
app/
  _layout.tsx          ← Add ProductProvider + add-product Stack.Screen
  (tabs)/
    index.tsx          ← Home screen (table + FAB)
  add-product.tsx      ← Form screen (NEW FILE)
  modal.tsx            ← Update or reuse for limit modal

context/
  ProductContext.tsx   ← NEW FILE (Context + Reducer + hook)

components/
  ProductTable.tsx     ← NEW FILE (table UI component)
  ProductForm.tsx      ← NEW FILE (form UI component)
  LimitModal.tsx       ← NEW FILE (modal UI component)
  SplashScreen.tsx     ← NEW FILE (animated splash)
```

---

## Packages to Use (already available or install if missing)

```bash
expo install expo-image-picker expo-splash-screen
```

| Package | Purpose | Status |
|---|---|---|
| `expo-router` | Navigation | Already installed |
| `expo-image-picker` | Photo selection | Install if missing |
| `expo-splash-screen` | Splash screen | Install if missing |
| `react-native-reanimated` | Animations | Already installed |
| `@react-navigation/native` | Theming | Already installed |

> No Redux needed — use Context + useReducer only.

---

## Key Implementation Notes

1. **Do not break the existing tab layout** — Home screen lives inside `(tabs)/`
2. **Photo storage**: store local URI from image picker (no backend/upload needed)
3. **Persistence**: in-memory state is fine (no AsyncStorage required unless specified)
4. **Expo Router navigation**: use `router.push('/add-product')` and `router.back()`
5. **TypeScript**: maintain `.tsx` file convention throughout
6. **Modal**: use controlled state (`useState`) to show/hide the limit modal
