terraform {
  backend "s3" {
    bucket       = "phoenix-shopsphere-tfstate-178055957181-ap-southeast-2"
    key          = "shopsphere/terraform.tfstate"
    region       = "ap-southeast-2"
    encrypt      = true
    use_lockfile = true
  }
}
