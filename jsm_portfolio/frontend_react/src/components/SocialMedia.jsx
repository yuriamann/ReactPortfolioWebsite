import React from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
    <a href="https://www.linkedin.com/in/yuria-mann">
      <BsLinkedin />
    </a>
    </div>
    <div>
    <a href="https://github.com/yuriamann">
      <BsGithub />
    </a>
    </div>
  </div>
);

export default SocialMedia;