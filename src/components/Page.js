import { Navigation } from "./Navigation";

export const Page = ({ children }) => (
  <>
    <header>
      <Navigation />
    </header>
    <main>{children}</main>
  </>
);
