import { Link } from "react-router-dom"
import { useAppSelector } from "../../../store/reduxHooks";

function HeaderOutput() {

    const { user } = useAppSelector((store) => store.user)
    

    return <>
        <div className="account-wrap__heading">
            <h2>Мой счет</h2>
            <div className="account-wrap__sum sum-account">
                <div className="sum-account__label">На счету: {user.score} руб</div>
                <Link className="sum-account__btn-orange btn-orange" to="/payments">Пополнить счет</Link>
            </div>
        </div>
    </>
}

export default HeaderOutput