document.addEventListener('DOMContentLoaded', function () {
    const friendItems = document.querySelectorAll('.friends-list li');
    friendItems.forEach(li => {
      const ratingIcons = li.querySelectorAll('.friend-rating .rating-icon');
      ratingIcons.forEach(icon => {
        icon.addEventListener('click', function () {
          // Remove 'selected' class from all icons in this friend rating group
          ratingIcons.forEach(i => i.classList.remove('selected'));
          // Add 'selected' class to the clicked icon
          this.classList.add('selected');
          
          // Determine rating based on a class name
          let rating = '';
          if (this.classList.contains('stupid')) {
            rating = 'Stupid';
          } else if (this.classList.contains('cool')) {
            rating = 'Cool';
          } else if (this.classList.contains('trustworthy')) {
            rating = 'Trustworthy';
          }
          
          // Store rating in the friend li as a data attribute
          li.setAttribute('data-rating', rating);
          
          // Log the friend name and selected rating
          const friendName = li.querySelector('.friend-name').textContent;
          console.log(`Friend "${friendName}" rated as: ${rating}`);
        });
      });
    });
  });
  