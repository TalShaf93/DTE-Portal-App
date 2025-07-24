import React from "react";
import LogoSvg from "../assets/brand/logo_gradient.svg";

const Logo = ({ className = "w-8 h-8" }) => (
    <img src={LogoSvg} alt="Dan‑Tech Logo" className={className} />
);
export default Logo;
