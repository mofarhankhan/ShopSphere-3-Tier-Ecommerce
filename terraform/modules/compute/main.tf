# Jenkins EC2 Instance

resource "aws_instance" "jenkins" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.jenkins_subnet_id
  vpc_security_group_ids = [var.jenkins_security_group_id]

  associate_public_ip_address = true

  iam_instance_profile = var.instance_profile_name

  monitoring = false

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-jenkins"
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Role        = "Jenkins"
  }
}


# K3s EC2 Instance

resource "aws_instance" "k3s" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.k3s_subnet_id
  vpc_security_group_ids = [var.k3s_security_group_id]

  associate_public_ip_address = true

  iam_instance_profile = var.instance_profile_name

  monitoring = false

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-k3s"
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Role        = "K3s"
  }
}
