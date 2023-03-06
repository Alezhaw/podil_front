import sert1 from "../../image/secure-con-logo.jpg"
import sert2 from '../../image/geotrust.png'
import sert3 from '../../image/pci-dss-compliant.png'
import sert4 from '../../image/bitmap.png'
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect } from 'react'
import { socket } from "../../App"

function Sertificates() {

    const { nameTheSite, user } = useAppSelector((store) => store.user)

    useEffect(() => {
        if (!user?.email) return;
        const time = new Date().toLocaleString().replaceAll(',', '');
        socket.emit('location', { email: user?.email, location: document?.location?.pathname, time });
        // eslint-disable-next-line
    }, [user]);

    return <div className="bg-img" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="seller-page">
            <div className="container">
                <div className="block-info-sertificate">
                    <h1 className="gen-text">Сертификаты и лицензии</h1>
                </div>
                <div className="answered-block">
                    <div className="section-desciption-block">
                        <h1 className="hidden-xl-text">SSL</h1>
                        <div className="desc-block-icon">
                            <img className="p-default" src={sert1} alt="ssl" />
                        </div>
                        <div className="desc-block-text">
                            <h1 className="hidden-sm-text">SSL</h1>
                            <p>Протокол SSL обеспечивает защищенный обмен данных между пользователями сервиса.</p>
                        </div>
                    </div>
                    <div style={{ flexDirection: "row-reverse" }} className="section-desciption-block section-desciption-block-right">
                        <h1 className="hidden-xl-text">Extended Validation Certificate (EV-сертификат)</h1>
                        <div className="desc-block-icon">
                            <img style={{ width: '100%' }} src={sert2} alt="GeoTrust3" />
                        </div>
                        <div className="desc-block-text">
                            <h1 className="hidden-sm-text">Extended Validation Certificate (EV-сертификат)</h1>
                            <p>Сертификат с расширенной проверкой (EV-сертификат) доказывает, что сайт не является одним из мошеннических или поддельных сайтов. Владелец сертификата проходит полную проверку подлинности согласно самым высоким стандартам индустрии безопасности. Проверку и выпуск сертификата осуществляет специализированный центр сертификации (GeoTrust).</p>
                        </div>
                    </div>
                    <div className="section-desciption-block">
                        <h1 className="hidden-xl-text">PCI DSS</h1>
                        <div className="desc-block-icon">
                            <img className="p-default" src={sert3} alt="GeoTrust2" />
                        </div>
                        <div className="desc-block-text">
                            <h1 className="hidden-sm-text">PCI DSS</h1>
                            <p>Операции с банковским картами и электронные платежи осуществляются через партнеров MandarinPay и Robokassa, имеющих действующие сертификаты безопасности PCI DSS версии 3.2</p>
                        </div>
                    </div>
                    <div style={{ flexDirection: "row-reverse" }} className="section-desciption-block section-desciption-block-right">
                        <h1 className="hidden-xl-text">Свидетельство о регистрации ЭВМ</h1>
                        <div className="desc-block-icon">
                            <img style={{ width: '100%' }} src={sert4} alt="GeoTrust1" />
                        </div>
                        <div className="desc-block-text">
                            <h1 className="hidden-sm-text">Свидетельство о регистрации ЭВМ</h1>
                            <p>{nameTheSite.name} использует лицензированное и собственное программное обеспечение, подтвержденное свидетельством правообладателя.</p>
                        </div>
                    </div>
                    <div className="info-block-after">
                        <p>Помните! Никогда не проверяйте человека на честность самостоятельно, так как риск потерять ваш товар очень и очень велик! Используйте гарант сервис {nameTheSite.name}. И помните, мошенник никогда, не при каких условиях не согласится на безопасную сделку, на гаранта.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default Sertificates