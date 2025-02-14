import { eventHandler } from 'h3';

export default eventHandler(async (event) => {
  const { req, res } = event.node;
  const slug = req.url?.split('/').pop();

  if (slug === 'cm') {
    res.statusCode = 200;
    return { type: 'admin', name: 'Sebastian Weber' };
  } else if (slug === 'VNwo6GJe8r4TDuhxjMkSq5MnewrFzMsL') {
    res.statusCode = 200;
    return { type: 'user', name: 'Anna Müller', image: 'anna.png', volume: 1000, used: 990, videos: 5, photos: 100, music: 10, job: 'Grafikdesignerin', expired: false, bg: 'bg1.jpg' };
  } else if (slug === 'v52rs4KOsIvQwMFiXEQlqZqFrcAaf7W3') {
    res.statusCode = 200;
    return { type: 'user', name: 'Maximilian Schmidt', image: 'max.png', volume: 1000, used: 500, videos: 15, photos: 10, music: 200, job: 'Content Creator / Podcaster', expired: false, bg: 'bg2.jpg' };
  }else if (slug == 'QOOSukvzIwyASDAnRICORvrglF2PUxvS') {
    return { type: 'user', name: 'Anna Müller', image: 'anna.png', volume: 1000, used: 1000, videos: 5, photos: 100, music: 10, job: 'Grafikdesignerin', expired: false, bg: 'bg1.jpg' };
  }else if (slug == 'A6ILuuYkMTqESE0pf48sjU7GRBYYat2S') {
    return { type: 'user', name: 'Maximilian Schmidt', image: 'max.png', volume: 1000, used: 500, videos: 15, photos: 10, music: 200, job: 'Content Creator / Podcaster', expired: true, bg: 'bg2.jpg' };
  } else {
    res.statusCode = 404;
    return { error: 'Not found' };
  }
});
