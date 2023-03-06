import StarIcon from '@mui/icons-material/Star';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

function CarouselItem({ nickName, title, price, discription }) {
    return (
        <>
            <div className="containerCard">
                <div className="card-header-coments">
                    <SentimentSatisfiedAltIcon style={{ color: 'white', marginRight: '5px' }}></SentimentSatisfiedAltIcon>
                    <span className="card-header-text-coments">{nickName}</span>
                </div>
                <div className="card-body-coments">
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                            <p>{title}</p>
                            <div>{price}</div>
                        </div>
                        <StarIcon style={{ color: 'gold' }}></StarIcon>
                        <StarIcon style={{ color: 'gold' }}></StarIcon>
                        <StarIcon style={{ color: 'gold' }}></StarIcon>
                        <StarIcon style={{ color: 'gold' }}></StarIcon>
                        <StarIcon style={{ color: 'gold' }}></StarIcon>
                    </div>
                    {discription}
                </div>
            </div>
        </>
    );
}

export default CarouselItem;
