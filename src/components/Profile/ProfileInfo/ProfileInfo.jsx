import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return (
      <>
        <Preloader />
      </>
    );
  }
  return (
    <div>
      {/* <div>
        <img
          src="https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"
          alt="img"
        />
      </div> */}
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      <div className={classes.descriptionBlock}>
        <img src={props.profile.photos.large} alt="avatar" />
      </div>
    </div>
  );
};

export default ProfileInfo;
