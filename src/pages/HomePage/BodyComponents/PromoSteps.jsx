import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/reduxHooks';
import { motion } from 'framer-motion';

function PromoSteps() {
    const { user } = useAppSelector((store) => store.user);

    const AnimetionMain = {
        hidden: {
            y: -20,
            opacity: 0,
            transition: { duration: 0.5 },
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <>
            <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2, once: true }} className="promo-steps container">
                <motion.h3 variants={AnimetionMain} viewport={{ amount: 0.2, once: true }} className="header-inner_title">
                    Как это работает
                </motion.h3>
                <ul className="list-steps">
                    <motion.li
                        initial={{
                            x: -20,
                            opacity: 0,
                            transition: { duration: 0.5 },
                        }}
                        whileInView={{
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.5 },
                        }}
                        viewport={{ amount: 0.2, once: true }}
                        className="step"
                    >
                        <PersonAddAltIcon style={{ width: '60px', height: '60px', marginRight: '10px', marginLeft: '-3px' }}></PersonAddAltIcon>
                        <div>
                            <h4 className="header-inner_title">
                                <Link className="link-hover-effects" to={user?.email === undefined ? '/registr' : '/'}>
                                    Регистрация
                                </Link>
                            </h4>
                            <p>Если Вы заинтересованы в безопасных сделках, то регистрация на нашем гарант сайте - это первый шаг, который позволит Вам начать пользоваться нашими услугами.</p>
                        </div>
                    </motion.li>
                    <motion.li
                        initial={{
                            x: -20,
                            opacity: 0,
                            transition: { duration: 0.5 },
                        }}
                        whileInView={{
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.5 },
                        }}
                        viewport={{ amount: 0.2, once: true }}
                        className="step"
                    >
                        <QuestionAnswerIcon style={{ width: '60px', height: '60px', marginRight: '10px', marginLeft: '-5px' }}></QuestionAnswerIcon>

                        <div>
                            <h4 className="header-inner_title">Обсуждение условий сделки</h4>
                            <p>
                                Участники обсуждают характеристики товара и сумму оплаты, выбирают платежную систему (Яндекс.Деньги, QIWI, WebMoney или Банковская карта), принимают решение о сумме
                                залога либо его отсутствии.
                            </p>
                        </div>
                    </motion.li>
                    <motion.li
                        initial={{
                            x: -20,
                            opacity: 0,
                            transition: { duration: 0.5 },
                        }}
                        whileInView={{
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.5 },
                        }}
                        viewport={{ amount: 0.2, once: true }}
                        className="step"
                    >
                        <AddCircleIcon style={{ width: '60px', height: '60px', marginRight: '10px', marginLeft: '-5px' }}></AddCircleIcon>
                        <div>
                            <h4 className="header-inner_title">Открытие сделки</h4>
                            <p>
                                Один из участников открывает сделку, другой её принимает. Если установлена опция залога, то оба участника вносят залог. Если на данном этапе что-то идёт не так (второй
                                участник пропал или не внёс залог), то сделка отменяется, залоги возвращаются. Для общения и передачи информации используется внутренний чат.
                            </p>
                        </div>
                    </motion.li>
                    <motion.li
                        initial={{
                            x: -20,
                            opacity: 0,
                            transition: { duration: 0.5 },
                        }}
                        whileInView={{
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.5 },
                        }}
                        viewport={{ amount: 0.2, once: true }}
                        className="step"
                    >
                        <QueryBuilderIcon style={{ width: '60px', height: '60px', marginRight: '10px', marginLeft: '-5px' }}></QueryBuilderIcon>
                        <div>
                            <h4 className="header-inner_title">Исполнение обязательств</h4>
                            <p>
                                Покупатель вносит деньги на баланс сделки, залоги сразу же блокируются. Продавец видит это и передаёт товар, после чего покупатель переводит деньги с баланса на баланс
                                продавца. Продавец может отказаться от сделки и вернуть деньги покупателю. Суть в том, что участники могут переводит деньги с баланса только на баланс друг друга, но не
                                на свои. В случае спора участники могут обратиться к гаранту сделок (
                                <Link className="link-hover-effects" to="#">
                                    арбитраж
                                </Link>
                                )
                            </p>
                        </div>
                    </motion.li>
                    <motion.li
                        initial={{
                            x: -20,
                            opacity: 0,
                            transition: { duration: 0.5 },
                        }}
                        whileInView={{
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.5 },
                        }}
                        viewport={{ amount: 0.2, once: true }}
                        className="step"
                    >
                        <HandshakeIcon style={{ width: '60px', height: '60px', marginRight: '10px', marginLeft: '-4px' }}></HandshakeIcon>
                        <div>
                            <h4 className="header-inner_title">Закрытие сделки</h4>
                            <p>Если на балансе сделки нет денег, то один из участников её закрывает, залоги возвращаются. Сделка через гаранта завершена.</p>
                        </div>
                    </motion.li>
                </ul>
            </motion.div>
        </>
    );
}

export default PromoSteps;
