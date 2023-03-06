import { useAppSelector } from '../../../store/reduxHooks';
import { motion } from 'framer-motion';

function BlockTextFree() {
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
                    transition: { duration: 0.3 },
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
                        <b>{nameTheSite.name}</b> - предлагает безопасные сделки в интернете с сайтами, доменами, социальными сетями, аккаунтами онлайн-игр, информационными услугами и многим другим.
                        Вконтакте - крупнейшая социальная сеть на просторах СНГ, если вам интересен доход, купить группу вк вконтакте.
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
                        Аналогов по охвату и функционалу на данный момент не имеется, но цены достаточно высокие. Всегда можно купить аккаунт facebook и развивать его дальше. Так же сюда можно отнести
                        видео-сеть youtube, которая идет в паре с предыдущей.
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
                        Вторая по популярности сеть в русскоязычном сегменте - Oдноклассники. Здесь вы найдете другую аудиторию и атмсоферу, поэтому можете купить группу однокласники. Instagram -
                        международная социальная сеть фото-формата, которая составляет конкуренцию даже facebook.
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
                        Для развития бизнеса можно купить аккаунт инстаграм. Конечно же, номер один мирового интернета - facebook. Аналогов по охвату и функционалу на данный момент не имеется, но цены
                        достаточно высокие. Всегда можно купить аккаунт facebook и развивать его дальше. Так же сюда можно отнести видео-сеть youtube, которая идет в паре с предыдущей. Если есть
                        желание, то купить канал youtube и развивай, монетизируй его в свое удовольствие.
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
                        Относительно новый игрок на рынке социальных сетей - telegram. Он сильно отличается от Вконтакте, Facebook, Instagram, так как является мессенджером.
                    </motion.p>
                </div>
            </motion.div>
        </>
    );
}

export default BlockTextFree;
