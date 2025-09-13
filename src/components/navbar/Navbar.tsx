import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/types/reduxHooks";

import { SortKeyType } from "@/types";

import { Sort } from "../sort/Sort";

import { setSort } from "@/store/redux/sortShopSlice";

import burgerIcon from "@/assets/menu-burger-horizontal-svgrepo-com.svg";

import styles from "./styles/Navbar.module.css";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const isRoot = location.pathname === "/";

  const sort = useAppSelector((state) => state.sort.sort);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navButtons}>
        <div className={styles.desktopMenu}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={closeMenu}
          >
            Shop
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={closeMenu}
          >
            Shopping Cart
          </NavLink>
        </div>

        <button className={styles.burgerToggle} onClick={toggleMenu}>
          <img src={burgerIcon} alt="Menu" className={styles.burgerIcon} />
        </button>

        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={closeMenu}
            >
              Shop
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={closeMenu}
            >
              Shopping Cart
            </NavLink>
          </div>
        )}
      </div>

      <div className={styles.desktopSort}>
        {isRoot && (
          <Sort
            sort={sort}
            onChange={(s: SortKeyType) => dispatch(setSort(s))}
          />
        )}
      </div>
    </nav>
  );
};

export { Navbar };
