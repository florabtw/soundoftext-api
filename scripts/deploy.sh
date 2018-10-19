#! /bin/bash

if [[ "$STRIPE__KEY" =~ "test" ]]; then
  echo "Unexpected value in STRIPE__KEY. Did you remember to set the right environment variables?"
  exit 1
fi

./scripts/make-dotenv.sh
scp .env nick@api.soundoftext.com:~/Deployment/.env

scp scripts/production.sh nick@api.soundoftext.com:~/Deployment/soundoftext-api.sh

ssh nick@api.soundoftext.com "/bin/bash ~/Deployment/soundoftext-api.sh"
