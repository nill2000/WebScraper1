#importing the Yagmail library
import yagmail
import os
from dotenv import load_dotenv

load_dotenv()

def send_notification():
    try:
        #initializing the server connection
        yag = yagmail.SMTP(user=os.environ.get("email"), password=os.environ.get("app_pw"))
        #sending the email
        yag.send(to=os.environ.get("email"), subject='ItemTracker', contents='Testing')
        print("Email sent successfully")
    except Exception as e:
        print("Error, email was not sent")
        print(e)

    
if __name__ == "__main__":
    send_notification()
