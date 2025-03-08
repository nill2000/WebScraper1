from scrapeClass import AmazonScraper, EbayScraper

def main():
	amazon_example = AmazonScraper("https://www.amazon.com/dp/B09HWYBCXQ/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B09HWYBCXQ&pd_rd_w=eysxy&content-id=amzn1.sym.386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_p=386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_r=1JBF395G0Y4J0Z1Z7ZK9&pd_rd_wg=QTt2R&pd_rd_r=caee3cc8-e913-473d-97e2-6deaf2f1c00d&s=kitchen&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM")
	print(amazon_example.fetch_data())
 
	ebay_example = EbayScraper("https://www.ebay.com/itm/186930636801?chn=ps&var=694993009933&_trkparms=ispr%3D1&amdata=enc%3A17jOujeMrTP2vF5OKLro_8g26&norover=1&mkevt=1&mkrid=711-117182-37290-0&mkcid=2&mkscid=101&itemid=694993009933_186930636801&targetid=2320093655185&device=c&mktype=pla&googleloc=9027676&poi=&campaignid=21222258394&mkgroupid=164713660992&rlsatarget=pla-2320093655185&abcId=9408285&merchantid=113390167&gad_source=1&gclid=Cj0KCQiA8q--BhDiARIsAP9tKI2BE8-hy5nnLSe9lc6XEOkAg-TWt_yGqB77y-DGlTWvd0KGSVEDDVgaAhYsEALw_wcB")
	print(ebay_example.fetch_data())
	
if __name__ == "__main__":
    main()