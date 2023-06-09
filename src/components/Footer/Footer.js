import "../../style/footer.css";

function Footer() {
  if (window.location.href.includes("adminPanel")) return null;

  return (
    <div className="footer">
      <div className="footer_panel">
        <div className="container footer_holder">
          <p className="footer_copyright"></p>
          <ul className="footer-menu">
            <li className="footer-menu_item"></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
