from Scraper import scrape_url
from Database import product_to_db

def main():
    link1 = "https://www.amazon.com/dp/B09HWYBCXQ/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B09HWYBCXQ&pd_rd_w=eysxy&content-id=amzn1.sym.386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_p=386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_r=1JBF395G0Y4J0Z1Z7ZK9&pd_rd_wg=QTt2R&pd_rd_r=caee3cc8-e913-473d-97e2-6deaf2f1c00d&s=kitchen&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM"
    
    link2 = "https://www.ebay.com/itm/352495099863?_skw=computer+speakers&epid=17023873312&itmmeta=01JP9PVN1ZB3JQVX058DJGZ4ZE&hash=item5212585fd7:g:u~4AAOSwa3FnWilV&itmprp=enc%3AAQAKAAAA0FkggFvd1GGDu0w3yXCmi1epRLjx%2FvqphftL6ms1yuekLZCUanXTY3cQWRkv1JslDePT9tXwOk%2BdQYPtDijNnDrjxgBRj01MXv0%2BTxeYpCvItUKkhfYx%2Ft%2FM2YPFJXYjJqYMhv5wUfcuIwO297BheYizkVinCNNDYojYGBlQD1IJpi2cI035Ozzg6d644eQrSxHQtC6lpQjOi0ejpYxHvM7u8B%2FGJmrIie3ilmFNYPNL%2BfYqpCQgRzwsW%2F8RuyZ7kGuvqtqUP3QvW7LR6Ih0u8k%3D%7Ctkp%3ABlBMUJzR7rayZQ"
    
    # link = input("Paste the Link: ")
    
    print(scrape_url(link2))
    # product_to_db(scrape_url(link1))
    
if __name__ == "__main__":
    main()