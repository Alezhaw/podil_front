import SecurityIcon from '@mui/icons-material/Security';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

function PromoteSlider() {
    return <>
         <motion.div className="promote-slider promote-slider__showcase">
                <div className="container">
                    <div className="promote-slider_holder">
                        <ul className="promote-slider_list">
                            <li className="promote-slider_item promote-slider_item_list">
                                <motion.div 
                                initial = {{
                                    x: -20,
                                    opacity: 0
                                }}
                                whileInView = {{
                                    x: 0,
                                    opacity: 1,
                                    transition: { duration: .5 },
                                }}
                                exit = {{
                                    y: -20,
                                    opacity: 0
                                 }}
                                viewport = {{amount: .2, once: true}}
                                className="info-card ">
                                    <div className="card-header">
                                        <SecurityIcon style={{ color: 'aliceblue', marginRight: '5px' }}></SecurityIcon>
                                        <span className="card-header-text">Надежность</span>
                                    </div>
                                    <div className="card-body">
                                        <CheckCircleIcon style={{ width: '20px', marginRight: '2px' }}></CheckCircleIcon>
                                        Персональный аттестат Webmoney, идентифицированы Qiwi, Яндекс Деньги
                                        <br />
                                        <br />
                                        <CheckCircleIcon style={{ width: '20px', marginRight: '2px' }}></CheckCircleIcon>
                                        Больше года на рынке безопасных сделок
                                        <br />
                                        <br />
                                        <CheckCircleIcon style={{ width: '20px', marginRight: '2px' }}></CheckCircleIcon>
                                        Система вычисления вероятности того, что пользователь мошшенник
                                        <br />
                                        <br />
                                        <CheckCircleIcon style={{ width: '20px', marginRight: '2px' }}></CheckCircleIcon>
                                        Актуальный черный список с автоматической проверкой всех пользователей
                                    </div>
                                </motion.div>
                                <motion.div 
                                initial = {{
                                    y: 20,
                                    opacity: 0
                                }}
                                whileInView = {{
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: .5 },
                                }}
                                viewport = {{amount: .2, once: true}}
                                className="info-card ">
                                    <div className="card-header">
                                        <AdminPanelSettingsIcon style={{ color: 'aliceblue', marginRight: '5px' }}></AdminPanelSettingsIcon>
                                        <span className="card-header-text">Конфиденциальность</span>
                                    </div>
                                    <div className="card-body">
                                        <CheckCircleIcon style={{ width: '20px', marginRight: '2px' }}></CheckCircleIcon>
                                        Сделка проходит на специальной странице, в закрытом чате, доступ к которому имеют только 2 участника и
                                        модератор сервиса.
                                        <br />
                                        <br />
                                        <CheckCircleIcon style={{ width: '20px', marginRight: '2px' }}></CheckCircleIcon>
                                        Запрет публикации данных для идентификации учетных записей.
                                        <br />
                                    </div>
                                </motion.div>
                                <motion.div 
                                initial = {{
                                    x: 20,
                                    opacity: 0
                                }}
                                whileInView = {{
                                    x: 0,
                                    opacity: 1,
                                    transition: { duration: .5 },
                                }}
                                viewport = {{amount: .2, once: true}}
                                className="info-card ">
                                    <div className="card-header">
                                        <ThumbUpIcon style={{ color: 'aliceblue', marginRight: '5px' }}></ThumbUpIcon>
                                        <span className="card-header-text">Удобство</span>
                                    </div>
                                    <div className="card-body">
                                        <CheckCircleIcon style={{ width: '20px', marginRight: '2px' }}></CheckCircleIcon>
                                        Наглядное представление сервиса
                                        <br />
                                        <br />
                                        <CheckCircleIcon style={{ width: '20px', marginRight: '2px' }}></CheckCircleIcon>
                                        Удобство использования безопасной сделки.
                                    </div>
                                </motion.div>
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.div>
    </>
}

export default PromoteSlider