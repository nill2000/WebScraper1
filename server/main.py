from Scraper import scrape_url

def main():
    link1 = "https://www.amazon.com/dp/B09HWYBCXQ/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B09HWYBCXQ&pd_rd_w=eysxy&content-id=amzn1.sym.386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_p=386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_r=1JBF395G0Y4J0Z1Z7ZK9&pd_rd_wg=QTt2R&pd_rd_r=caee3cc8-e913-473d-97e2-6deaf2f1c00d&s=kitchen&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM"
    
    print(scrape_url(link1))
    
if __name__ == "__main__":
    main()