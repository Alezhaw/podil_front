import Baner from '../../image/banner-img2.png'
import Handshake from "@mui/icons-material/Handshake"
import DescriptionIcon from '@mui/icons-material/Description';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import OrderIcon from '../../image/circle-img.png'
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useAppSelector } from "../../store/reduxHooks";
import { socket } from "../../App";
import { useEffect } from 'react'

function Howitwork() {

    const { nameTheSite, user } = useAppSelector((store) => store.user)

    useEffect(() => {
        if (!user?.email) return;
        const time = new Date().toLocaleString().replaceAll(',', '');
        socket.emit('location', { email: user?.email, location: document?.location?.pathname, time });
        // eslint-disable-next-line
    }, [user]);

    return <div className="bg-img" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container">
            <div className="page-container">
                <div className="main-section main-section--about">
                    <div className="main-section__banner">
                        <img className="img-cover" src={Baner} alt="img" />
                    </div>
                    <div className="main-section__heading">
                        <h2>Что такое {nameTheSite.name}</h2>
                        <p>{nameTheSite.name} - сервис, защищающий торговые сделки в интернете и гарантирующий выполнение обязательств,
                            что снижает риски мошеничества и подлоги.</p>
                    </div>
                </div>
                <div className="step-wrap">
                    <div className="step-wrap__item">
                        <div className="step-wrap__card card-sert">
                            <div className="card-sert__number">Шаг 1</div>
                            <div className="card-sert__img-wrap">
                                <Handshake style={{ color: 'black', width: '45px', height: '45px' }}></Handshake>
                            </div>
                            <div className="card-sert__content">Продавец и покупатель договариются о сделке</div>
                        </div>
                    </div>
                    <div className="step-wrap__item">
                        <div className="step-wrap__card card-sert">
                            <div className="card-sert__number">Шаг 2</div>
                            <div className="card-sert__img-wrap">
                                <DescriptionIcon style={{ color: 'black', width: '45px', height: '45px' }}></DescriptionIcon>
                            </div>
                            <div className="card-sert__content">Продавцом или покупателем создается сделка</div>
                        </div>
                    </div>
                    <div className="step-wrap__item">
                        <div className="step-wrap__card card-sert">
                            <div className="card-sert__number">Шаг 3</div>
                            <div className="card-sert__img-wrap">
                                <AddShoppingCartIcon style={{ color: 'black', width: '45px', height: '45px' }}></AddShoppingCartIcon>
                            </div>
                            <div className="card-sert__content">Сумма переводится на баланс сделки. Она замораживается</div>
                        </div>
                    </div>
                    <div className="step-wrap__item">
                        <div className="step-wrap__card card-sert">
                            <div className="card-sert__number">Шаг 4</div>
                            <div className="card-sert__img-wrap">
                                <PrecisionManufacturingIcon style={{ color: 'black', width: '45px', height: '45px' }}></PrecisionManufacturingIcon>
                            </div>
                            <div className="card-sert__content">Передача товара или же выполнение услуги покупателю</div>
                        </div>
                    </div>
                    <div className="step-wrap__item">
                        <div className="step-wrap__card card-sert">
                            <div className="card-sert__number">Шаг 5</div>
                            <div className="card-sert__img-wrap">
                                <FindInPageIcon style={{ color: 'black', width: '45px', height: '45px' }}></FindInPageIcon>
                            </div>
                            <div className="card-sert__content">Покупатель принимает и проверяет товар или же услугу на соответствие
                            </div>
                        </div>
                    </div>
                    <div className="step-wrap__item">
                        <div className="step-wrap__card card-sert">
                            <div className="card-sert__number">Шаг 6</div>
                            <div className="card-sert__img-wrap">
                                <RequestQuoteIcon style={{ color: 'black', width: '45px', height: '45px' }}></RequestQuoteIcon>
                            </div>
                            <div className="card-sert__content">Покупатель подтверждает платеж, деньги переходят на баланс продавцу
                            </div>
                        </div>
                    </div>
                </div>
                <div className="status-wrap">
                    <div className="status-wrap__heading">Все защищенные сделки имеют определенные статусы, зависящие от этапа.
                    </div>
                    <div className="status-wrap__info-list info-list">
                        <div className="info-list__item">
                            <div className="info-list__card card-info">
                                <div className="card-info__heading">
                                    <div className="card-info__img-wrap">
                                        <AlarmOnIcon style={{ width: '45px', height: '45px' }}></AlarmOnIcon>
                                    </div>
                                    <p>Статус “Ожидает подтверждения”</p>
                                </div>
                                <div className="card-info__content">После создания сделки ее статус становится “Ожидает подтверждения”. В
                                    данном статусе продавец или покупатель должны подтвердить ее на странице Мои сделки.
                                    В условиях сделки можно указать условия доставки, этапы оплаты, качество товаров или услуг, срок
                                    проверки или же гарантийные обязательства. </div>
                            </div>
                        </div>
                        <div className="info-list__item">
                            <div className="info-list__card card-info">
                                <div className="card-info__heading">
                                    <div className="card-info__img-wrap">
                                        <AlarmOnIcon style={{ width: '45px', height: '45px' }}></AlarmOnIcon>
                                    </div>
                                    <p>Статус “Ожидается оплата”</p>
                                </div>
                                <div className="card-info__content">После подтверждения сделки обеими сторонами, она получает статус
                                    “Ожидается оплата”.<br />
                                    Для перехода к следующему этапу необходимо произвести оплату.</div>
                            </div>
                        </div>
                        <div className="info-list__item">
                            <div className="info-list__card card-info">
                                <div className="card-info__heading">
                                    <div className="card-info__img-wrap">
                                        <RequestQuoteIcon style={{ width: '45px', height: '45px' }}></RequestQuoteIcon>
                                    </div>
                                    <p>Статус “Оплачено”</p>
                                </div>
                                <div className="card-info__content">Продавец должен передать товар или услугу оговоренным способом. После
                                    передачи товара происходит проверка на соответствие покупателем.</div>
                            </div>
                        </div>
                        <div className="info-list__item">
                            <div className="info-list__card card-info">
                                <div className="card-info__heading">
                                    <div className="card-info__img-wrap">
                                        <ReportProblemIcon style={{ width: '45px', height: '45px' }}></ReportProblemIcon>
                                    </div>
                                    <p>Статус “Арбитраж”</p>
                                </div>
                                <div className="card-info__content">В случае, когда стороны не приходят к соглашению из-за несоответствия
                                    товара заявленным характеристикам, они могут воспользоваться помощью опытных арбитражных
                                    консультантов {nameTheSite.name}, которые разберутся в деталях и предложат вероятные пути разрешения спора.
                                </div>
                            </div>
                        </div>
                        <div className="info-list__item">
                            <div className="info-list__card card-info">
                                <div className="card-info__heading">
                                    <div className="card-info__img-wrap">
                                        <CheckCircleOutlineIcon style={{ width: '45px', height: '45px' }}></CheckCircleOutlineIcon>
                                    </div>
                                    <p>Статус “Завершенная сделка”</p>
                                </div>
                                <div className="card-info__content">Успешное завершение сделки. При полном выполнении обязательств
                                    продавца перед покупателем {nameTheSite.name} переводит денежные средства на баланс продавца. При выявлении
                                    ненадлежащего условия выполнения условий сделки - деньги возвращаются покупателю. Сделка
                                    закрывается.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="protection-period">
                    <div className="protection-period__heading">Период защиты сделки </div>
                    <div className="protection-period__description">
                        <p>ВНИМАНИЕ!<br />
                            Период защиты сделки распространяется только в случае купли-продажи материальных товаров.</p>
                        <p>Он составляет 21 день с момента отправки товара, если в условиях не указан другой срок. Если в течение
                            периода защиты сделки покупатель не осуществил действия “Принять сделку” или “Открыть претензию”, то
                            сделка считается завершенной и деньги переводятся продавцу.</p>
                    </div>
                </div>
                <div className="banner-info">
                    <div className="banner-info__img-wrap">
                        <img className="banner-info__img-wrap" src={OrderIcon} alt="imgOrder" />
                    </div>
                    <div className="banner-info__description">Используйте наш сервис {nameTheSite.name}, не рискуя самостоятельно проверять
                        человека на честность. Мошенник никогда и ни при каких условиях не согласиться проводить безопасную
                        сделку.</div>
                </div>
            </div>
        </div>
    </div>
}

export default Howitwork