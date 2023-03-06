import { useAppSelector } from "../../store/reduxHooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function BlockMaseges() {
    const navigate = useNavigate();
    const { user } = useAppSelector((store) => store.user);

    useEffect(() => {
        if (user?.checkRu === 'true') {
            navigate("/")
        }
    }, [user, navigate])


    return <div className="bg-img">
        <div style={{ minHeight: "90vh" }} className="container">
            <h2 style={{ color: "red", marginTop: '30px' }}>Ваш аккаунт заблокирован ,обратитесь в поддержку для выяснения причин</h2>
        </div>
    </div>
}

export default BlockMaseges