import React, { useState } from 'react'

const ImageSlider = ({ images=[], backendUrl }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        if(currentIndex>0){
           setCurrentIndex(currentIndex - 1) 
        }
    }
    const nextSlide = () => {
        if(currentIndex<images.length-1){
          setCurrentIndex(currentIndex + 1)  
        } 
    }
    return (
        <div className='relative w-full mx-auto overflow-hidden rounded-lg shadow-lg'>
            <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {
                    images && images.map((image, index) => (
                          <img key={index} src={backendUrl + '/images/' + image} alt="" className='min-w-full h-[400px] object-cover' />  
                    ))
                }
            </div>
            {/* slider buttons */}
            <button onClick={prevSlide} className={`absolute top-1/2 left-2 transform-translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 ${currentIndex===0?"opacity-50 cursor-not-allowed":""}`} disabled={currentIndex===0}>&#8249;</button>
            <button onClick={nextSlide} className={`absolute top-1/2 right-2 transform-translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 ${currentIndex===images.length-1?"opacity-50 cursor-not-allowed":""}`} disabled={currentIndex===images.length-1}>&#8250;</button>
            {/* dots */}
            <div className='absolute bottom-2 left-1/2 transform-translate-x-1/2 flex space-x-2'>
                {
                    images && images.map((_, index) => (
                        <div key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full cursor-pointer ${currentIndex === index ? "bg-gray-600" : "bg-gray-400"}`}>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ImageSlider