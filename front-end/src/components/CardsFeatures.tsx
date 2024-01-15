interface Props {
  img: string;
  heading: string;
  description: string;
}

function CardsFeatures({img, heading, description}  : Props) {
  return (
    <div>
        <div className=" relative flex flex-col w-[330px] h-72 bg-green-600 bg-opacity-70 items-center justify-center p-6 text-white rounded-sm">
            <img src={img} alt={heading} width={100}  height={100}/>
            <p className=" font-bold text-2xl py-3 mx-1 text-center ">{heading}</p>
            <p className=" text-center">{description}</p>
        </div>
    </div>
  )
}

export default CardsFeatures;