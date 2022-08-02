import whitelogo from '../../assets/Logo-White.png';

function Footer() {
    return (
        <>
            <div className="w-full flex bg-zinc-700 justify-center items-center bottom-0">
                <img src={whitelogo} alt="white logo" className='scale-75' />
            </div>
        </>
    );
}

export default Footer;