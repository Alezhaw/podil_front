import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useAppSelector } from '../../../store/reduxHooks';
import { Link } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import { motion } from 'framer-motion';

function PromoDescription() {
    const { user, nameTheSite } = useAppSelector((store) => store.user);

    const AnimetionMain = {
        hidden: {
            y: -20,
            opacity: 0,
            transition: { duration: 0.3 },
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3 },
        },
    };

    return (
        <>
            <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2, once: true }} className="promo-description container">
                <motion.div variants={AnimetionMain} viewport={{ amount: 0.2, once: true }} className="block-main-v1">
                    <h1>{nameTheSite.name} - лучший гарант безопасных сделок!</h1>
                    <Link style={{ textDecoration: 'none' }} to={`${user?.id ? 'makedeal' : '/login'}`}>
                        <button className="btn-class-v1">Открыть новую сделку</button>
                    </Link>
                </motion.div>
                <ul className="ist-promo">
                    <motion.li
                        initial={{
                            x: -20,
                            opacity: 0,
                        }}
                        whileInView={{
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.5 },
                        }}
                        viewport={{ amount: 0.2, once: true }}
                        className="list-promo-item"
                    >
                        <SecurityIcon className="hovet-effect"></SecurityIcon>
                        <p>
                            Наш сервис отвечает за безопасность
                            <br />
                            каждой сделки.
                        </p>
                    </motion.li>
                    <motion.li
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        whileInView={{
                            y: 0,
                            opacity: 1,
                            transition: { duration: 0.5 },
                        }}
                        viewport={{ amount: 0.2, once: true }}
                        className="list-promo-item"
                    >
                        <CalendarMonthIcon className="hovet-effect"></CalendarMonthIcon>
                        <p>
                            Сервис работает 24 часа в сутки
                            <br />7 дней в неделю
                        </p>
                    </motion.li>
                    <motion.li
                        initial={{
                            x: 20,
                            opacity: 0,
                        }}
                        whileInView={{
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.5 },
                        }}
                        viewport={{ amount: 0.2, once: true }}
                        className="list-promo-item"
                    >
                        <CurrencyExchangeIcon className="hovet-effect"></CurrencyExchangeIcon>
                        <p>Комиссия меньше 10%</p>
                    </motion.li>
                </ul>
            </motion.div>
        </>
    );
}

export default PromoDescription;
