import React from 'react'
const destinations = [
    {
      name: 'Tirupati',
      state: 'Andhra Pradesh',
      properties: 300,
      image: 'https://cdn.britannica.com/22/156222-050-BEE18768/Sri-Venkateswara-Swamy-Temple-Tirumala-Tirupati-India.jpg',
    },
    {
      name: 'Manali',
      state: 'Himachal Pradesh',
      properties: 1015,
      image: 'https://clubmahindra.gumlet.io/blog/images/Manali-in-Summer-resized.jpg?w=376&dpr=2.6',
    },
    {
      name: 'Shimla',
      state: 'Himachal Pradesh',
      properties: 471,
      image: 'https://c.ndtvimg.com/2025-01/tuhgraag_shimla_625x300_31_January_25.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=738',
    },
    {
      name: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      properties: 379,
      image: 'https://images.yourstory.com/cs/wordpress/2016/02/Yourstory-Visakhapatnam-1.jpg?mode=crop&crop=faces&ar=16%3A9&format=auto&w=1920&q=75',
    },
    {
      name: 'Katra',
      state: 'Jammu and Kashmir',
      properties: 211,
      image: 'https://blog.lemontreehotels.com/wp-content/uploads/2018/06/Top-Places-to-Visit-Around-Katra.jpg',
    },
    {
      name: 'Patna',
      state: 'Bihar',
      properties: 458,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQju5PftnBHNa5-mqXJggZB1pfMw7f6oW2MXQ&s',
    },
  ];
function CarousalMenu() {
  return (
    <div>
      <div className="px-4">
      <h2 className="text-2xl font-bold mb-4">Popular Destinations</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="min-w-[220px] rounded-xl overflow-hidden shadow-md relative"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-[8.3rem] left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-white">
              <h3 className="text-lg font-semibold">{dest.name}</h3>
              <p className="text-xs uppercase">{dest.state}</p>
            </div>
            <div className="bg-white p-2 text-sm font-medium flex justify-between items-center">
              <span>{dest.properties} Properties</span>
              <span className="text-lg"><i class="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default CarousalMenu

