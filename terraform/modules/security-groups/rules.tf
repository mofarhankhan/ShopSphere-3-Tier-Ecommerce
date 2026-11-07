# Application HTTP access
resource "aws_vpc_security_group_ingress_rule" "app_http" {
  security_group_id = aws_security_group.app.id

  description = "Allow HTTP traffic"
  ip_protocol = "tcp"
  from_port   = 80
  to_port     = 80
  cidr_ipv4   = "0.0.0.0/0"
}

# Application HTTPS access
resource "aws_vpc_security_group_ingress_rule" "app_https" {
  security_group_id = aws_security_group.app.id

  description = "Allow HTTPS traffic"
  ip_protocol = "tcp"
  from_port   = 443
  to_port     = 443
  cidr_ipv4   = "0.0.0.0/0"
}

# K3s application HTTP access
resource "aws_vpc_security_group_ingress_rule" "k3s_http" {
  security_group_id = aws_security_group.k3s.id

  description = "Allow application HTTP traffic"
  ip_protocol = "tcp"
  from_port   = 80
  to_port     = 80
  cidr_ipv4   = "0.0.0.0/0"
}

# K3s application HTTPS access
resource "aws_vpc_security_group_ingress_rule" "k3s_https" {
  security_group_id = aws_security_group.k3s.id

  description = "Allow application HTTPS traffic"
  ip_protocol = "tcp"
  from_port   = 443
  to_port     = 443
  cidr_ipv4   = "0.0.0.0/0"
}

# Kubernetes API access from Jenkins only
resource "aws_vpc_security_group_ingress_rule" "k3s_api_from_jenkins" {
  security_group_id            = aws_security_group.k3s.id
  referenced_security_group_id = aws_security_group.jenkins.id

  description = "Allow Kubernetes API access from Jenkins"
  ip_protocol = "tcp"
  from_port   = 6443
  to_port     = 6443
}

# SSH access to Jenkins from Ansible control node
resource "aws_vpc_security_group_ingress_rule" "jenkins_ssh_from_master" {
  security_group_id            = aws_security_group.jenkins.id
  referenced_security_group_id = var.master_security_group_id

  description = "Allow SSH access from Ansible control node"
  ip_protocol = "tcp"
  from_port   = 22
  to_port     = 22
}

# SSH access to K3s from Ansible control node
resource "aws_vpc_security_group_ingress_rule" "k3s_ssh_from_master" {
  security_group_id            = aws_security_group.k3s.id
  referenced_security_group_id = var.master_security_group_id

  description = "Allow SSH access from Ansible control node"
  ip_protocol = "tcp"
  from_port   = 22
  to_port     = 22
}
