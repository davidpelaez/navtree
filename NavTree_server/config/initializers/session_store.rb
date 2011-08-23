# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_NavTree_server_session',
  :secret      => '6c1ef020641d605dcdf6702d4a73b0c140a13abe1b47666354d4ae02d1f3100fa29af6fe629dfe753804ab31c530f677d722db798fa64fdb9a005aca3d75dec3'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
