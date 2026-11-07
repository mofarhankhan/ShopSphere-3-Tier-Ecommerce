output "jenkins_instance_id" {
  description = "Jenkins EC2 instance ID"
  value       = aws_instance.jenkins.id
}

output "jenkins_public_ip" {
  description = "Jenkins EC2 public IP"
  value       = aws_instance.jenkins.public_ip
}

output "k3s_instance_id" {
  description = "K3s EC2 instance ID"
  value       = aws_instance.k3s.id
}

output "k3s_public_ip" {
  description = "K3s EC2 public IP"
  value       = aws_instance.k3s.public_ip
}
