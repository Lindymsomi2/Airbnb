import React from "react";
import { Footerdiv, FinePrint } from "./Footer.styled";

const Footer = () => {
  return (
    <>
    <Footerdiv>
      <ul className="grouplist pb-3">
        <li>Support</li>
        <li>Help Center</li>
        <li>Safety information</li>
        <li>Cancellation options</li>
        <li>Our COVID-19 Response</li>
        <li>Supporting people with disabilities</li>
        <li>Report a neighborhood concern</li>

        <li>Community</li>
        <li>Airbnb.org: disaster relief housing</li>
        <li>Support Afghan refugees</li>
        <li>Combating discrimination</li>
        <li>Join the LGBTQ+ community</li>
        <li>Guest Referrals</li>
        <li>Gift cards</li>

        <li>Hosting</li>
        <li>Try hosting</li>
        <li>AirCover: protection for Hosts</li>

        <li>Explore hosting resources</li>
        <li>Visit our community forum</li>
        <li>How to host responsibly</li>
        <li>Host an online experience</li>

        <li>About</li>
        <li>Newsroom</li>
        <li>Learn about new features</li>
        <li>Letter from our founders</li>
        <li>Careers</li>
        <li>Investors</li>
      </ul>
      <hr />
    </Footerdiv>

<FinePrint>
<p>© 2021 Airbnb Clone - Privacy - Terms - Siteman</p>
<div className="seperateGroup">
<i className="bi bi-globe"></i>
<select  aria-label="Default select example">
  <option selected>English</option>
  <option value="1">isiZulu</option>
  <option value="2">Russian</option>
  <option value="3">Mandarin</option>
   <option value="3">Hindi</option>
    <option value="3">Spanish</option>
</select>

<select  aria-label="Default select example">
  <option selected>USD</option>
  <option value="1">ZAR</option>
  <option value="2">RMB</option>
  <option value="3">INR</option>
   <option value="3">BRL</option>
    <option value="3">RUB</option>
</select>

<i class="bi bi-facebook"></i>
<i class="bi bi-twitter-x"></i>
<i class="bi bi-instagram"></i>
</div>
</FinePrint>
</>
  );
};

export default Footer;
