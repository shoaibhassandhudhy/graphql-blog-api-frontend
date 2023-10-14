import { useMediaQuery, useTheme } from "@mui/material";
import { useRef, useEffect, useCallback } from "react";
import { HEADER_SCROLL_BEHAVIOUR } from "../../styles/constants";
import { HeaderWrapper } from "../../styles";
import { FullViewHeader } from "./FullViewHeader";
import { MobileHeader } from "./MobileHeader";
import { UserContext } from "../../context/user";
import { useAuth } from "../../hooks";
import { useContext } from "react";
export const Header = () => {
  const theme = useTheme();
  const headerRef = useRef<HTMLDivElement>();
  const { logout } = useAuth();
  const { isLoggedIn } = useContext(UserContext);
  const isMobileView = useMediaQuery("(max-width:970px)");

  const onScrollHeaderBehaviour = useCallback(() => {
    if (headerRef.current) {
      if (window.scrollY > headerRef.current?.offsetHeight)
        headerRef.current.style.cssText += HEADER_SCROLL_BEHAVIOUR.sticky;
      else if (window.scrollY === 0) {
        headerRef.current.style.cssText += HEADER_SCROLL_BEHAVIOUR.nonSticky;
        headerRef.current.style.top = `-${
          headerRef.current?.offsetHeight - 10
        }px`;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScrollHeaderBehaviour);
    return () => {
      window.removeEventListener("scroll", onScrollHeaderBehaviour);
    };
  }, []);

  return (
    <HeaderWrapper ref={headerRef}>
      {isMobileView ? (
        <MobileHeader isLoggedIn={isLoggedIn} logout={logout} />
      ) : (
        <FullViewHeader isLoggedIn={isLoggedIn} logout={logout} />
      )}
    </HeaderWrapper>
  );
};
