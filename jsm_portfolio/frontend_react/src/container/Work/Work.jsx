import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">My <span>Portfolio</span> Section</h2>

      <div className="app__work-filter">
        {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div
              className="app__work-img app__flex"
            >
              <img src={urlFor(work.imgUrl)} alt={work.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">

                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// import{images} from '../../constants';

// //import { AppWrap, MotionWrap } from '../../wrapper';
// import './About.scss';
// import { urlFor, client } from '../../client';

// const abouts = [
//   {title:'Web Development', description: 'I am a good web developer', imgUrl:images.about01},
//   {title:'Web Design', description: 'I am a good web developer', imgUrl:images.about02},
//   {title:'Web UI/UX', description: 'I am a yuhh web developer', imgUrl:images.about03}
// ]

// const About = () => {

//   const [abouts, setAbouts] = useState([]);

//   useEffect(() => {
//     const query = '*[_type == "abouts"]';

//     client.fetch(query).then((data) => {
//       setAbouts(data);
//     });
//   }, []);


//   return (
//     <>
//       <h2 className="head-text">I Know that <span>Good Design</span> <br />means  <span>Good Business</span></h2>

//       <div className="app__profiles">
//         {abouts.map((about, index) => (
//           <motion.div
//             whileInView={{ opacity: 1 }}
//             whileHover={{ scale: 1.1 }}
//             transition={{ duration: 0.5, type: 'tween' }}
//             className="app__profile-item"
//             key={about.title + index}
//           >
//             <img src={about.imgUrl} alt={about.title} />
//             <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
//             <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
//           </motion.div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default About