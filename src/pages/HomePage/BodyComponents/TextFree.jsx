import { useAppSelector } from '../../../store/reduxHooks';
import { motion } from 'framer-motion';

function TextFree() {
    const { nameTheSite } = useAppSelector((store) => store.user);

    return (
        <>
            <motion.div
                initial={{
                    y: -20,
                    opacity: 0,
                }}
                whileInView={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5 },
                }}
                exit={{
                    y: -20,
                    opacity: 0,
                }}
                viewport={{ amount: 0.2, once: true }}
                className="container bg-img"
            >
                <div className="block-text-free">
                    <motion.p
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
                        className="text-free"
                    >
                        <b>Самый надежный гарант игровых сделок. </b>
                        Мы только начали свою работу, и с каждым разом будем улучшать наш сервис.
                    </motion.p>
                    <motion.p
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
                        className="text-free"
                    >
                        <b>Отзывчивая онлайн-поддержка. </b>
                        Безопасные сделки идут через специальный чат, к которому имеют доступ обе стороны, а также консультанты {nameTheSite.name}, которых можно привлечь при необходимости.
                    </motion.p>
                    <motion.p
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
                        className="text-free"
                    >
                        <b>Оплата за посредничество минимальна. </b>
                        Еще одно преимущество — низкая комиссия, которую взимает гарант безопасных сделок {nameTheSite.name}. Это небольшая сумма, но даже она дает вам уверенность, что вас не обманут.
                    </motion.p>
                    <motion.p
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
                        className="text-free"
                    >
                        <b>Нет материальных рисков. </b>
                        Арбитраж сервиса несет материальную ответственность в случае ошибки в разрешении спора между участниками, поэтому безопасная сделка в интернете с нами комфортнее, чем с
                        кем-либо. Защита интересов предоставляется обеим сторонам: продавцу и покупателю, фрилансеру и заказчику. Гарант онлайн-сделок {nameTheSite.name} — ваш щит от нечестных
                        продавцов и покупателей, нерадивых исполнителей, необязательных заказчиков и прочих мошенников.
                    </motion.p>
                    <motion.p
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
                        className="text-free"
                    >
                        Не проверяйте на честность продавца самостоятельно никогда, так как риск потерять ваши деньги очень и очень велик! Пользуйтесь гарант сервисом {nameTheSite.name}. И помните,
                        мошенник никогда, не при каких условиях не согласится на безопасную сделку, на гаранта.
                    </motion.p>
                </div>
            </motion.div>
        </>
    );
}

export default TextFree;
