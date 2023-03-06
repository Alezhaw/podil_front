import { Link } from 'react-router-dom'
import '../../style/footer.css'
import { useAppSelector } from "../../store/reduxHooks";


function Footer() {
    let date = new Date()
    let year = date.getFullYear()

    const { nameTheSite } = useAppSelector((store) => store.user)

    if (window.location.href.includes('adminPanel')) return null;

    return <div className="footer">
        <div className="footer_panel">
            <div className="container footer_holder">
                <p className="footer_copyright">© 2017– {year} Гарант сервис {nameTheSite.name}</p>
                <ul className="footer-menu">
                    <li className="footer-menu_item">
                        <Link className="footer-menu_link" to='/rules' >Пользовательское соглашение</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default Footer