import passport from 'passport';

export default  {

  login(req, res) {
    passport.authenticate('login', { failureFlash: true }, (err, userData) => {
      if (err) {
        if (err.name === 'Incorrect Credentials Error') {
          return res.status(400).json({
            state: 'failure',
            errors: [
              {
                type: 'Authentication Error',
                messages: 'Incorrect Credentials Error'
              }
            ]
          });
        }

        return res.status(400).json({
          state: 'failure',
          errors: [
            {
              type: 'Authentication Error',
              messages: 'Could not process the form.'
            }
          ]
        });
      }

      if (userData) {
        return res.status(200).json({
          state: 'success',
          user: userData
        })
      } else {
        return res.status(200).json({
          state: 'failure',
          message: req.flash('loginMessage')[0],
        })
      }

    })(req, res);
  },

  signUp(req, res) {
    passport.authenticate('signup', { failureFlash: true }, err => {

      if (err) {
        if (err.name === 'Incorrect Credentials Error') {
          return res.status(400).json({
            state: 'failure',
            errors: [
              {
                type: 'Authentication Error',
                messages: 'Incorrect Credentials Error'
              }
            ]
          });
        }

        return res.status(400).json({
          state: 'failure',
          errors: [
            {
              type: 'Authentication Error',
              messages: 'Could not process the form.'
            }
          ]
        });
      }

      return res.status(200).json({
        state: 'success'
      })

    })(req, res);
  }
}