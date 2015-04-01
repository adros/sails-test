/*global User*/
var passport = require("passport");
var BasicStrategy = require("passport-http").BasicStrategy;
passport.use(new BasicStrategy(
	function(username, password, done) {
		User.findOne({
			username : username
		})
		.then(function(user) {
			if (!user) {
				return done(null, false);
			}

			if (!user.validatePassword(password)) {
				return done(null, false);
			}
			done(null, user);
		})
		.catch(function(/*err*/) {
			return done(null, false);
		});
	}
));
