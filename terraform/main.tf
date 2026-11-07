module "networking" {
  source = "./modules/networking"

  vpc_id               = var.vpc_id
  project_name         = var.project_name
  environment          = var.environment
  private_subnet_cidrs = var.private_subnet_cidrs
  availability_zones   = var.availability_zones
}

module "security_groups" {
  source = "./modules/security-groups"

  project_name             = var.project_name
  environment              = var.environment
  vpc_id                   = var.vpc_id
  master_security_group_id = var.master_security_group_id
}

module "compute" {
  source = "./modules/compute"

  project_name = var.project_name
  environment  = var.environment

  ami_id                = var.ami_id
  instance_type         = var.instance_type
  instance_profile_name = var.instance_profile_name

  jenkins_subnet_id = var.jenkins_subnet_id
  k3s_subnet_id     = var.k3s_subnet_id

  jenkins_security_group_id = module.security_groups.jenkins_security_group_id
  k3s_security_group_id     = module.security_groups.k3s_security_group_id
}
