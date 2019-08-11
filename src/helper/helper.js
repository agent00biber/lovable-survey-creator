export default {
  observer(index, threshold, id) {
    let navContainer = document.getElementById("subnav-view");
    let navID = document.getElementById(["surveyNav" + index]);
    let navWidth = navID.clientWidth;
    let options = {
      threshold: threshold
    };
    let callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          //when a posts comes into view, add an active-class to the navbar
          navID.classList.add("nav-active");
          navContainer.scrollLeft = index * navWidth;
        } else {
          //and remove it, if the post is not visible anymore
          navID.classList.remove("nav-active");
        }
      });
    };
    //define the target to observe
    let target = document.getElementById(id);
    //observe a target
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);
  }
};
