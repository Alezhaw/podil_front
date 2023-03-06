import '../../style/body.css';
import { useAppSelector } from '../../store/reduxHooks';
import { useEffect } from 'react';
import { socket } from '../../App';
import PromoDescription from './BodyComponents/PromoDescription';
import PromoSteps from './BodyComponents/PromoSteps';
import PromoteSlider from './BodyComponents/PromoteSlider';
import TextFree from './BodyComponents/TextFree';
import PromoteSliderImage from './BodyComponents/PromoteSliderImage';
import BlockTextFree from './BodyComponents/BlockTextFree';
import Reviews from './BodyComponents/Reviews';
import { useDispatch } from 'react-redux';
import { axiosGetUserTransfers } from '../../api/transfer';
import { axiosGetUserToUserTransfers } from '../../api/transferToUser';
import { reducerTypes } from '../../store/Users/types';

function Body() {
    const dispatch = useDispatch();
    const { user } = useAppSelector((store) => store.user);

    async function getTransfers() {
        if (!user?.email) return;
        let transfers = await axiosGetUserTransfers(user?.email);
        if (transfers) {
            dispatch({
                type: reducerTypes.GET_TRANSFERS,
                payload: transfers,
            });
        }
        let transfersToUser = await axiosGetUserToUserTransfers(user?.email);
        if (transfersToUser) {
            dispatch({
                type: reducerTypes.GET_TRANSFERS_TO_USER,
                payload: transfersToUser,
            });
        }
    }

    useEffect(() => {
        getTransfers();
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        if (!user?.email) return;
        const time = new Date().toLocaleString().replaceAll(',', '');
        socket.emit('location', { email: user?.email, location: document?.location?.pathname, time });
        // eslint-disable-next-line
    }, [user]);

    return (
        <div className="container-body-v1 bg-img">
            <PromoDescription />
            <PromoSteps />
            <PromoteSlider />
            <TextFree />
            <PromoteSliderImage />
            <BlockTextFree />
            <Reviews />
        </div>
    );
}

export default Body;
