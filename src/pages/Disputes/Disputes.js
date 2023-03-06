import Baner from '../../image/banner-img3.png';
import Spore from '../../image/spore-img1.svg';
import Spore2 from '../../image/spore-img2.svg';
import Spore3 from '../../image/spore-img3.svg';
import Spore4 from '../../image/spore-img4.svg';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect } from 'react';
import { socket } from "../../App";

function Disputes() {
    const { user, nameTheSite } = useAppSelector((store) => store.user);

    useEffect(() => {
        if (!user?.email) return;
        const time = new Date().toLocaleString().replaceAll(',', '');
        socket.emit('location', { email: user?.email, location: document?.location?.pathname, time });
        // eslint-disable-next-line
    }, [user]);

    return <div className="bg-img" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container">
            <div className="page-container">
                <div className="main-section main-section--disputes">
                    <div className="main-section__banner">
                        <img className="img-cover" src={Baner} alt="" />
                    </div>
                    <div className="main-section__heading">
                        <h2>Решение споров</h2>
                        <p>{nameTheSite.name} является независимой третьей стороной и выступает объективным арбитром в урегулировании
                            конфликтов между покупателями и продавцами</p>
                    </div>
                </div>
                <div className="disputes-wrap">
                    <div className="disputes-wrap__info-list info-list">
                        <div className="info-list__item">
                            <div className="info-list__card card-info">
                                <div className="card-info__heading">
                                    <div className="card-info__img-wrap">
                                        <img style={{ width: '35px' }} src={Spore} alt="" />
                                    </div>
                                    <p>Выставление претензии</p>
                                </div>
                                <div className="card-info__content">В случае несоответствия товара или услуги заявленным характеристикам
                                    покупатель в праве выставить продавцу претензию. Деньги будут переданы продавцу после того, как
                                    стороны придут к соглашению и претензия будет снята.</div>
                            </div>
                        </div>
                        <div className="info-list__item">
                            <div className="info-list__card card-info">
                                <div className="card-info__heading">
                                    <div className="card-info__img-wrap">
                                        <img style={{ width: '35px' }} src={Spore2} alt="" />
                                    </div>
                                    <p>Возможность частичного или полного возврата</p>
                                </div>
                                <div className="card-info__content">Для урегулирования возникших разногласий стороны могут договориться о
                                    возврате товара или скидке на уже отправленный товар. В таком случае покупатель либо вернет полную
                                    стоимость товара, либо часть суммы, которые стороны согласуют между собой.</div>
                            </div>
                        </div>
                        <div className="info-list__item">
                            <div className="info-list__card card-info">
                                <div className="card-info__heading">
                                    <div className="card-info__img-wrap">
                                        <img style={{ width: '35px' }} src={Spore3} alt="" />
                                    </div>
                                    <p>Арбитраж</p>
                                </div>
                                <div className="card-info__content">В случае несоответствия товара или услуги заявленным характеристикам
                                    покупатель в праве выставить продавцу претензию. Деньги будут переданы продавцу после того, как
                                    стороны придут к соглашению и претензия будет снята.</div>
                            </div>
                        </div>
                        <div className="info-list__item">
                            <div className="info-list__card card-info">
                                <div className="card-info__heading">
                                    <div className="card-info__img-wrap">
                                        <img style={{ width: '35px' }} src={Spore4} alt="" />
                                    </div>
                                    <p>Третейский суд</p>
                                </div>
                                <div className="card-info__content">В случае невозможности достичь договоренности между собой, стороны
                                    могут обратиться в партнерский Третейский суд при АНО “Правосудие”. Суд детально изучит суть спора и
                                    претензии, а после вынесет свое решение в течение нескольких дней. Решение суда обязательно для
                                    исполнения всеми сторонами спора и, в соответствии с законодательством РФ, не подлежит обжалованию.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-check-info">
                    <ul className="list-clip">
                        <div style={{ display: "flex" }}><AttachFileIcon style={{ width: '20px' }}></AttachFileIcon> <li>Положение об Арбитражном центре при АНО “Правосудие”</li></div>
                        <div style={{ display: "flex" }}><AttachFileIcon style={{ width: '20px' }}></AttachFileIcon> <li>Положение об Арбитражных сборах Арбитражного центра при АНО “Правосудие”</li></div>
                        <div style={{ display: "flex" }}><AttachFileIcon style={{ width: '20px' }}></AttachFileIcon> <li>Арбитражный регламент Арбитражного центра при АНО “Правосудие”</li></div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}

export default Disputes